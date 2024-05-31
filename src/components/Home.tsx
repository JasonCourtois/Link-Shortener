import TextBox from "./TextBox.tsx";
import Test from "./Title.tsx";

function Home() {
  return (
    <>
      <div className="parent">
        <div className="container">
          <Test />
          <TextBox />
        </div>
      </div>
    </>
  );
}

export default Home;
