import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ArchivePage() {
  const [members, setMembers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  
  // 입력 폼 상태
  const [title, setTitle] = useState('');
  const [result, setResult] = useState('우승');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  useEffect(() => {
    fetchMembers();
    fetchTournaments();
  }, []);

  const fetchMembers = async () => {
    const { data } = await supabase.from('members').select('*').order('name');
    setMembers(data || []);
  };

  const fetchTournaments = async () => {
    const { data } = await supabase.from('tournaments').select('*').order('event_date', { ascending: false });
    setTournaments(data || []);
  };

  const handleMemberCheck = (id) => {
    setSelectedMembers(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const addTournament = async () => {
    if (!title) return alert("대회명을 입력해주세요!");
    const { data, error } = await supabase.from('tournaments').insert([{ 
      title, result, youtube_url: youtubeUrl 
    }]);
    if (error) alert(error.message);
    else {
      alert("대회 기록 완료!");
      setTitle(''); setYoutubeUrl('');
      fetchTournaments();
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>🏆 대회 전적 아카이브</h1>
      
      {/* 대회 등록 폼 */}
      <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #e5e7eb' }}>
        <h3>새 대회 기록하기</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          <input placeholder="대회명" value={title} onChange={e => setTitle(e.target.value)} style={{ padding: '10px' }} />
          <select value={result} onChange={e => setResult(e.target.value)} style={{ padding: '10px' }}>
            <option>우승</option>
            <option>준우승</option>
            <option>3위</option>
            <option>본선진출</option>
            <option>예선탈락</option>
          </select>
          
          <div>
            <p style={{ fontSize: '14px', marginBottom: '5px' }}>참가 선수 선택</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', background: 'white', padding: '10px', borderRadius: '4px' }}>
              {members.map(m => (
                <label key={m.id} style={{ fontSize: '13px' }}>
                  <input type="checkbox" onChange={() => handleMemberCheck(m.id)} /> {m.name}
                </label>
              ))}
            </div>
          </div>

          <input placeholder="유튜브 링크 (개별 또는 재생목록)" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} style={{ padding: '10px' }} />
          <button onClick={addTournament} style={{ background: '#059669', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>대회 기록 저장</button>
        </div>
      </div>

      {/* 기록 리스트 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {tournaments.map(t => (
          <div key={t.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            <span style={{ background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{t.result}</span>
            <h4 style={{ margin: '10px 0' }}>{t.title}</h4>
            {t.youtube_url && <a href={t.youtube_url} target="_blank" style={{ color: '#2563eb', fontSize: '13px' }}>📺 경기 영상 보기</a>}
          </div>
        ))}
      </div>
    </div>
  );
}
