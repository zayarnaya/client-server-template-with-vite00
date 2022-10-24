import React, { useCallback, useEffect, useRef, useState } from 'react';
import './game.scss';
import foto from '../../assets/avatar.svg';
import { Tetris } from './game-screen';
import { Link } from 'react-router-dom';
import { APIurls } from '../../helpers/prefix';

export const Game: React.FC = () => {
  const [IsGameStarted, setIsGameStarted] = useState(false);
  const [gameNo, setGameNo] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefFigure = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lineCount, setLineCount] = useState(0);
  const [isGameEnded, setGameEnded] = useState(false);

  const getData = useCallback((score: number, level: number, lineCount: number) => {
    setScore(score);
    setLevel(level);
    setLineCount(lineCount);
  }, []);
  const getEnd = useCallback(() => {
    setGameEnded(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasFigure = canvasRefFigure.current;
    if (canvas && canvasFigure) {
      const context = canvas.getContext('2d');
      const contextFigure = canvasFigure.getContext('2d');
      if (context && contextFigure) {
        context.fillStyle = '#eee';
        context.strokeStyle = '#111';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.strokeRect(0, 0, context.canvas.width, context.canvas.height);
      }
    }
  }, []);

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    setScore(0);
    setLevel(1);
    setLineCount(0);
    setGameNo(gameNo + 1);
  }, [gameNo]);

  async function logout() {
    const response = await fetch(APIurls.LOGOUT, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  const handleLogout = () => {
    logout().then((response) => {
      console.log(response);
    });
  };

  const handleNewGame = useCallback(() => {
    setGameEnded(false);
    startGame();
  }, [startGame]);

  // TODO завернуть в useCallback

  return (
    <div className="game">
      <div className="game-menu">
        <h2 className="game-menu__header">Меню</h2>
        <ul className="game-menu__submenu">
          <li className="game-menu__link" onClick={startGame}>
            Новая игра
          </li>
          <li>
            <Link className="game-menu__link" to="/howto">
              Как играть
            </Link>
          </li>

          <li>
            <Link className="game-menu__link" to="/leaderboard">
              Доска почета
            </Link>
          </li>
        </ul>
        <ul className="game-menu__submenu">
          <li>
            <Link className="game-menu__link" to="/profile">
              Мой профиль
            </Link>
          </li>
        </ul>
        <ul className="game-menu__submenu">
          <li>
            <Link className="game-menu__link" to="/phorum">
              Форум
            </Link>
          </li>
        </ul>
        <ul className="game-menu__submenu">
          <li className="game-menu__link game-menu__link_color-red" onClick={handleLogout}>
            Выйти
          </li>
        </ul>
      </div>
      <div className="game-screen">
        <canvas className="game-screen__canvas" ref={canvasRef} id="canvas" width={500} height={1000}>
          {IsGameStarted && (
            <>
              <Tetris
                canvas={canvasRef.current}
                canvasFigure={canvasRefFigure.current}
                getDataUp={getData}
                sendEnd={getEnd}
                gameNo={gameNo}
              />
            </>
          )}
        </canvas>
        {!IsGameStarted && (
          <button className="game-screen__start-button" onClick={startGame}>
            Начать игру
          </button>
        )}
        {isGameEnded && (
          <div className="game-screen__game-end">
            <h3>Игра окончена!</h3>
            <p>Вы добрались до {level} уровня</p>
            <p>Ваш счет: {score} очков</p>
            <button className="game-screen__end-button" onClick={handleNewGame}>
              Играть снова
            </button>
          </div>
        )}
      </div>
      <div className="game-info">
        <div className="game-info__next-figure">
          <canvas className="game-info__canvas-figure" ref={canvasRefFigure} id="canvas-figure"></canvas>
        </div>
        <p>Следующая фигура</p>
        <div className="game-info__user-info">
          <img className="game-info__avatar" src={foto} alt="" />
          <Link className="game-info__user-name" to="/profile">
            Иван Иваныч Джагатай-Хан
          </Link>
        </div>
        <div className="game-info__score">
          <p>Счет: {score}</p>
          <p>Уровень: {level}</p>
          <p>Линии: {lineCount}</p>
        </div>
      </div>
    </div>
  );
};
