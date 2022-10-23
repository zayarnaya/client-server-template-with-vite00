import React, { useEffect, useRef, useState } from 'react';
import './game.scss';
import foto from '../../assets/avatar.svg';
import { Tetris } from './game-screen';
import { tetrominoSequence, playfield, tetrominos, colors } from './constant';
import { Link } from 'react-router-dom';
import { APIurls } from '../../helpers/prefix';
export const Game: React.FC = () => {
  const [IsGameStarted, setIsGameStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefFigure = useRef<HTMLCanvasElement>(null);
  const [score] = useState(0);
  const [level] = useState(1);
  const [lineCount] = useState(0);

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
  const startGame = () => {
    setIsGameStarted(true);
    const w = new Tetris(
      'canvas',
      10,
      20,
      canvasRef,
      canvasRef.current,
      tetrominoSequence,
      playfield,
      tetrominos,
      colors,
    );
    w.init();
    w.makeKeys();
    function step() {
      requestAnimationFrame(step);
      w.loop();
    }
    step();
  };

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
        <canvas className="game-screen__canvas" ref={canvasRef} id="canvas" width={500} height={1000}></canvas>

        {!IsGameStarted && (
          <button className="game-screen__start-button" onClick={startGame}>
            Начать игру
          </button>
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
