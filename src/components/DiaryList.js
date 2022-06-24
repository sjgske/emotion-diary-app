import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((el, idx) => (
        <option key={idx} value={el.value}>
          {el.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");

  // 정렬
  const getProcessedDiaryList = () => {
    // 비교함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date); // 내림차순
      } else {
        return parseInt(a.date) - parseInt(b.date); // 오름차순
      }
    };

    // 원본 배열 바뀌지 않도록 배열 복사!
    // 다차원 배열 (배열 속 객체) 깊은 복사 -> JSON 메서드
    const copyList = JSON.parse(JSON.stringify(diaryList));
    // sort 메서드로 정렬
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedDiaryList().map((el) => (
        <div key={el.id}>{el.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
