import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>🏐 GVT 배구 동호회 관리 시스템</h1>
      <p>서버가 연결되었습니다! 이제 멤버를 등록해보세요.</p>
      {/* 여기에 기존의 멤버 관리 로직이 들어갑니다 */}
    </div>
  );
}
