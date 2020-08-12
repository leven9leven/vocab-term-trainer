import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .welcome {
    padding-top: 60px;
    padding-bottom: 20px;
  }

  .footer {
    padding-top: 30px;
  }
`;

export default function Home() {
  return (
    <Styles>
      <h1 className="welcome">Welcome to quiz app!</h1>

      <h4>
        This app allows you to create <br />
        several sets of quizzes and <br />
        practice the set. Get started by <br />
        clicking the sets tab above!
      </h4>
      <h6 className="footer">@ Prem Bhanderi 2020</h6>
    </Styles>
  );
}
