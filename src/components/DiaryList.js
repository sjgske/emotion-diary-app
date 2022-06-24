import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
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
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  // 정렬
  const getProcessedDiaryList = () => {
    // 필터링함수
    const filterCallback = (el) => {
      if (filter === "good") {
        return parseInt(el.emotion) <= 3;
      } else {
        return parseInt(el.emotion) > 3;
      }
    };

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

    // filtering
    const filteredList =
      filter === "all" ? copyList : copyList.filter((el) => filterCallback(el));

    // sort 메서드로 정렬
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu-wrapper">
        <ControlMenu
          value={sortType}
          onChange={setSortType}
          optionList={sortOptionList}
        />
        <ControlMenu
          value={filter}
          onChange={setFilter}
          optionList={filterOptionList}
        />
        <MyButton
          type="positive"
          text="새 일기쓰기"
          onClick={() => navigate("/new")}
        />
      </div>
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
