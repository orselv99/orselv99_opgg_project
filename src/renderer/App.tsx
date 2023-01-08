import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LeftBar } from './pages/leftbar';
import { TopBar } from './pages/topbar';
import { LeagueOfLegends } from './pages/leagueoflegends';
import { Valorant } from './pages/valorant';
import { RootState } from './redux';
import { setCurrentGameType, setIsGameRunning, setVisiting } from './redux/common';

// window max 가 되면 readius 제거
const Wrapper = styled.div<{ isMaximize: boolean }>`
  margin: -6px 0 0 0;
  background-color: #0c0f13;
   ${(props) => props.isMaximize === false && 'border-radius: 10px;'} 
  height: 101%;
`
const Contents = styled.div`
  display: flex;
  height: 100%;
`;
const Rectangle = styled.div`
  width: 1px;
  height: 100%;
  background-color: #202530;
`;
const Center = styled.div`
  margin: 20px 0 0 20px;
  width: 100%;
`

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMaximize = useSelector((state: RootState) => state.common.isMaximize);
  const games = useSelector((state: RootState) => state.common.games);
  const currentGameType = useSelector((state: RootState) => state.common.currentGameType);

  useEffect(() => {
    let current = 'NONE';

    // 하나 이상의 게임이 실행되는 경우,
    // 계속해서 current game 이 변경되어, 
    // 마지막 watch 된 게임의 탭으로 계속해서 이동되는 것을 방지
    let preventAutoNavigate = false;

    window.ipcRenderer.on('RENDERER_COMMON', (event, args) => {
      const arg: IPCValue = args;
      switch (arg.type) {
        case 'isGameRunning':
          const data: WatchData = arg.value;

          // 설정된 시간마다 업데이트
          dispatch(setIsGameRunning({
            type: data.type,
            isRunning: data.isRunning
          }));

          // 현재 실행중인 게임
          if (preventAutoNavigate === false && data.isRunning === true) {
            dispatch(setCurrentGameType(data.type));
            current = data.type;
            preventAutoNavigate = true;
          }

          // 실행중이던 게임이 종료
          if (data.type === current && data.isRunning === false) {
            dispatch(setCurrentGameType('NONE'));
            current = 'NONE';
            preventAutoNavigate = false;
          }
          break;
      }
    });
  }, []);

  useEffect(() => {
    if (currentGameType === 'NONE') {
      return;
    }

    games.forEach((value) => {
      // 현재 실행중인 게임탭으로 이동
      if (value.isRunning === true) {
        navigate(`/${String(value.type)}`);
        dispatch(setVisiting(value.type));
      }
    });
  }, [currentGameType]);

  return (
    <Wrapper isMaximize={isMaximize}>
      <TopBar />
      <Contents>
        <LeftBar />
        <Rectangle />
        <Center>
          <Routes>
            <Route path='/' element={<div>orseLv99_opgg_project</div>} />
            <Route path={`/${String('LEAGUE_OF_LEGENDS' as GameType)}`} element={<LeagueOfLegends />} />
            <Route path={`/${String('VALORANT' as GameType)}`} element={<Valorant />} />
          </Routes>
        </Center>
      </Contents>
    </Wrapper>
  );
}

