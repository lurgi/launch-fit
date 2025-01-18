import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>개인정보처리방침 | Prelaunch.kr</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6">
        <div className="w-full max-w-2xl bg-zinc-100 p-6 rounded-lg shadow-md text-left">
          <h1 className="text-3xl font-bold mb-4">🔐 개인정보처리방침</h1>
          <p className="mb-4">Prelaunch.kr(이하 ‘서비스’)는 사용자의 개인정보 보호를 위해 최선을 다합니다.</p>
          <h2 className="text-2xl font-semibold mt-6">1. 수집하는 개인정보 항목</h2>
          <p className="mb-4">- 이메일 주소: 서비스 업데이트 및 알림 제공을 위해 사용됩니다.</p>
          <h2 className="text-2xl font-semibold mt-6">2. 개인정보의 이용 목적</h2>
          <p className="mb-4">
            - 서비스 이용 통계 분석
            <br />- 관심 고객 확보 및 연락
          </p>
          <h2 className="text-2xl font-semibold mt-6">3. 개인정보의 보관 및 보호</h2>
          <p className="mb-4">
            - 수집된 이메일은 보안 시스템을 통해 보호됩니다.
            <br />- 사용자는 언제든지 이메일 삭제를 요청할 수 있습니다.
          </p>
          <h2 className="text-2xl font-semibold mt-6">4. 개인정보 제공 및 공유</h2>
          <p className="mb-4">- 사용자의 개인정보는 제3자에게 제공되지 않습니다.</p>
          <h2 className="text-2xl font-semibold mt-6">5. 개인정보 보호책임자</h2>
          <p>서비스 운영과 관련된 개인정보 보호 문의는 [이메일 주소]로 가능합니다.</p>
        </div>
      </div>
    </>
  );
}
