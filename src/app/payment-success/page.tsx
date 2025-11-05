import React from 'react'

const Success = () => {

 const varOcg = "success"; 

  const styles: {
    container: React.CSSProperties;
    box: React.CSSProperties;
    title: React.CSSProperties;
    // button: React.CSSProperties;
    video: React.CSSProperties;
  } = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #f0fff4, #e6fffa)",
      fontFamily: "Poppins, sans-serif",
    },
    box: {
      textAlign: "center",
      background: "#fff",
      padding: "3rem 4rem",
      borderRadius: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    },
    title: {
      color: "#16a34a",
      marginBottom: "10px",
    },
    // button: {
    //   backgroundColor: "#22c55e",
    //   color: "white",
    //   border: "none",
    //   padding: "0.8rem 1.8rem",
    //   borderRadius: "8px",
    //   fontSize: "1rem",
    //   cursor: "pointer",
    //   transition: "0.3s",
    // },
    video: {
    width: 160,
    height: 160,
    margin: "0 auto",
    display: "block",
  },
  };

  return (
    <div style={styles.container}>

      <div style ={styles.box}>

  <video style={styles.video} autoPlay muted playsInline>
  <source src="/success.webm" type="video/webm" />
</video>

        <h1 style={styles.title}>Payment Successful!</h1>
        <p>Your transaction has been completed successfully.</p>
      </div>
    </div>
  );
};


export default Success;

