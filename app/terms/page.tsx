import Head from "next/head";

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>이용약관 | Prelaunch.kr</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6">
        <div className="w-full max-w-2xl bg-zinc-100 p-6 rounded-lg shadow-md text-left">
          <h1 className="text-3xl font-bold mb-4">📜 이용약관</h1>
          <p className="mb-4">
            본 서비스 Prelaunch.kr(이하 ‘서비스’)를 이용해 주셔서 감사합니다. 본 약관은 서비스 이용과 관련하여 사용자와
            Prelaunch.kr 간의 권리 및 의무를 명시합니다.
          </p>
          <h2 className="text-2xl font-semibold mt-6">1. 서비스 제공 및 변경</h2>
          <p className="mb-4">
            서비스는 사용자의 아이디어 검증 및 이메일 수집을 위한 플랫폼을 제공합니다. 서비스의 기능은 지속적으로 개선
            및 변경될 수 있습니다.
          </p>
          <h2 className="text-2xl font-semibold mt-6">2. 사용자 책임</h2>
          <p className="mb-4">사용자는 서비스 내에서 허위 정보를 입력하거나 불법적인 활동을 해서는 안 됩니다.</p>
          <h2 className="text-2xl font-semibold mt-6">3. 책임 제한</h2>
          <p className="mb-4">
            본 서비스는 사용자 간의 거래 또는 외부 사이트 연결로 인한 문제에 대해 책임을 지지 않습니다.
          </p>
          <h2 className="text-2xl font-semibold mt-6">4. 약관 변경</h2>
          <p>본 약관은 서비스 운영상 필요에 따라 변경될 수 있으며, 변경된 약관은 공지사항을 통해 안내됩니다.</p>
        </div>
      </div>
    </>
  );
}
