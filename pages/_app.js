import Link from 'next/link';

export default function App({ Component, pageProps }) {
  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#f8fafc' }}>
      {/* 🏐 공통 상단 메뉴 바 */}
      <nav style={{ 
        background: '#1e3a8a', 
        padding: '15px 30px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: 'white',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
      }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
          🏐 GVT ARCHIVE
        </Link>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/members" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 'bold' }}>멤버 관리</Link>
          <Link href="/archive" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 'bold' }}>대회 아카이브</Link>
          <Link href="/settlement" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 'bold' }}>스마트 정산</Link>
        </div>
      </nav>

      {/* 실제 페이지 내용이 들어가는 자리 */}
      <div style={{ padding: '20px' }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
