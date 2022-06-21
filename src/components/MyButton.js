const MyButton = ({ text, type, onClick }) => {
  // positive, negative, default 이외의 값 방지
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button className={["MyButton", btnType].join(" ")} onClick={onClick}>
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
