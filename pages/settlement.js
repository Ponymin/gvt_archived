import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SettlementPage() {
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  
  // 입력 상태
  const [category, setCategory] = useState('식대');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data } = await supabase.from('members').select('*').order('name');
    setMembers(data || []);
  };

  const addExpense = () => {
    if (!amount) return alert("금액을 입력하세요!");
    const newExpense = { category, amount: parseInt(amount), description };
    setExpenses([...expenses, newExpense]);
    setTotalExpense(prev => prev + parseInt(amount));
    setAmount(''); setDescription('');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>💰 대회 정산 및 예산 관리</h1>
      
      {/* 지출 입력창 */}
      <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #fecaca' }}>
        <h3>💸 지출 내역 입력</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '10px' }}>
            <option>참가비</option>
            <option>식대</option>
            <option>숙박비</option>
            <option>유류비</option>
            <option>기타</option>
          </select>
          <input type="number" placeholder="금액" value={amount} onChange={e => setAmount(e.target.value)} style={{ padding: '10px' }} />
          <input placeholder="상세 내용" value={description} onChange={e => setDescription(e.target.value)} style={{ padding: '10px', flex: 1 }} />
          <button onClick={addExpense} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>추가</button>
        </div>
      </div>

      {/* 정산 요약 */}
      <div style={{ background: '#f0f9ff', padding: '25px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
        <h3>📊 정산 결과 요약</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {expenses.map((ex, i) => (
            <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e0f2fe' }}>
              <span>[{ex.category}] {ex.description}</span>
              <span style={{ fontWeight: 'bold' }}>{ex.amount.toLocaleString()}원</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #7dd3fc', textAlign: 'right' }}>
          <p style={{ fontSize: '18px' }}>총 지출액: <strong>{totalExpense.toLocaleString()}원</strong></p>
          <p style={{ fontSize: '20px', color: '#0369a1' }}>
            1인당 납부액: <strong>{members.length > 0 ? Math.ceil(totalExpense / members.length).toLocaleString() : 0}원</strong>
          </p>
        </div>
      </div>
      
      <p style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>* 등록된 전체 인원({members.length}명) 기준 n분의 1 자동 계산입니다.</p>
    </div>
  );
}
