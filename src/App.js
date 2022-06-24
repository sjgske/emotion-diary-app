import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      // 리턴을 안해주면 default가 자동으로 실행됨 -> break 해주기
      break;
    }
    case "REMOVE": {
      newState = state.filter((el) => el.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((el) =>
        el.id === action.data.id ? { ...action.data } : el
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emtion: 1,
    content: "오늘의일기1번",
    date: 1656041277804,
  },
  {
    id: 2,
    emtion: 2,
    content: "오늘의일기2번",
    date: 1656041277805,
  },
  {
    id: 3,
    emtion: 3,
    content: "오늘의일기3번",
    date: 1656041277806,
  },
  {
    id: 4,
    emtion: 4,
    content: "오늘의일기4번",
    date: 1656041277807,
  },
  {
    id: 5,
    emtion: 5,
    content: "오늘의일기5번",
    date: 1656041277808,
  },
  {
    id: 6,
    emtion: 5,
    content: "오늘의일기6번",
    date: 1556041277808,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current++;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
