'use client';

export default function NotFound() {
    return (
      <>
        <style jsx global>{`
          .error-page {
            font-family: 'Kanit', sans-serif !important;
            font-weight: 300 !important;

          }
        `}</style>
        <div
          className="error-page"
          style={{ textAlign: "center", marginTop: "20vh", fontSize: "2rem" }}
        >
          404
          <br />
          This page could not be found.
        </div>
      </>
    );
  }
  