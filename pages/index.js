export default function MainHome() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '70vh',
      textAlign: 'center'
    }}>
      {/* 🖼️ GVT 로고 이미지 들어가는 자리 */}
      <img 
        src="/gvt로고.jpg" 
        alt="GVT LOGO" 
        onError={(e) => {
          // 혹시 아직 이미지 업로드를 안 하셨을 때 대신 뜰 임시 배구공 아이콘
          e.target.style.display = 'none';
        }}
        style={{ maxWidth: '400px', width: '100%', marginBottom: '20px', borderRadius: '12px' }} 
      />
      
      {/* 이미지 없을 때 뜨는 백업 로고 마크 */}
      <div style={{ fontSize: '80px', marginBottom: '10px' }}>🏐</div>
      
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e3a8a', margin: '10px 0' }}>
        GVT VOLLEYBALL CLUB
      </h1>
      <p style={{ color: '#64748b', fontSize: '18px' }}>
        기록과 정산을 한 눈에 관리하는 우리 팀 아카이빙 센터
      </p>
    </div>
  );
}
