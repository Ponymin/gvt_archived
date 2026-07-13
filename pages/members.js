import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function MemberManager() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('남');
  const [position, setPosition] = useState('');

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('members').select('*').order('name');
    if (error) console.log('error', error);
    else setMembers(data);
  };

  useEffect(() => { fetchMembers(); }, []);

  const addMember = async () => {
    if (!name) return alert("이름을 입력해주세요!");
    const { error } = await supabase.from('members').insert([{ name, gender, position }]);
    if (error) alert("등록 실패: " + error.message);
    else { setName(''); setPosition(''); fetchMembers(); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>🏐 GVT 멤버 관리</h1>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', marginBottom: '30px', display: 'flex', gap: '10px', alignItems: 'flex-end', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>이름</label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }} placeholder="이름 입력" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>성별</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}>
            <option value="남">남</option><option value="여">여</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>포지션 (자유입력)</label>
          <input value={position} onChange={(e) => setPosition(e.target.value)} style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px', width: '100%' }} placeholder="예: 세터, 센터" />
        </div>
        <button onClick={addMember} style={{ background: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>등록</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead><tr style={{ borderBottom: '2px solid #ddd', background: '#f1f5f9' }}><th style={{ textAlign: 'left', padding: '12px' }}>성별</th><th style={{ textAlign: 'left', padding: '12px' }}>이름</th><th style={{ textAlign: 'left', padding: '12px' }}>포지션</th></tr></thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>{m.gender === '남' ? '♂️' : '♀️'}</td>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>{m.name}</td>
              <td style={{ padding: '12px', color: '#666' }}>{m.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
