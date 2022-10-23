import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PhorumPostProps } from '../PhorumPost/PhorumPost';
import { PhorumPostList } from '../PhorumPostList/PhorumPostList';
import { PhorumReply } from '../PhorumReply/PhorumReply';
import './PhorumThreadPageContent.scss';

const dummyPosts: PhorumPostProps[] = [
  {
    userName: 'Душка Фулгрим!!',
    // eslint-disable-next-line quotes
    text: "Самый простой (ну для меня по крайней мере) способ называется WALL Charge. Переведем это как 'зарядка от стены'. Суть: если тетромино касается стенок стакана (игрового поля) или самого стэка- нажми стрелку навстречу этой стене и твой DAS зарядится! На картинке: L-piece (а вот так называется эта тетроминошка) уже опустилась в обнизку на стэке и не имеет возможности перемещаться по-горизонтали. Упри ее в стену, пока она не зафиксировалась! Если с этого момента стрелку 'вправо' не отпускать, то следующая упавшая тетромино будет перемещаться в стакане минуя DAS. При таком способе управления игрок уже при появлении в окне превью следующего тетромино должен знать куда он его положит. Понимаете? О тетроминошке, которая падает сейчас вы уже подумали заранее и приняли меры, а в то время пока она падает, вы думаете о следующей и принимаете меры к ней) На высоких уровнях это архи сложно, но не менее интересно!",
    postDate: new Date(),
    id: '1',
  },
  {
    userAvatar: 'https://www.fillmurray.com/200/300',
    userName: 'Злютик Незабутик',
    text: 'Суть техники: во время Entry Delay игрок зажатием стрелки перемещает тетромино туда, куда ему надо (в данном случае J-piece должен вписаться в крайнее правое положение) и резко отпускат стрелку еще до того, как начнется падение. Это ооочень сложно, особенно когда тетромино должно упасть куда-нибудь в середину стэка. Немного передержал не додержал и алес! Ну и крайняя (но не по значению) фишечка в арсенале DAS-игрока  это Last Second Tap или Quick Tap.',
    postDate: new Date(),
    id: '2',
  },
  {
    userName: 'Грегор Рейвенманн',
    // eslint-disable-next-line quotes
    text: "Как вы думаете, есть ли между ними принципиальная разница? Нет? И вот тут опять всплывает тонкость игры, которую не замечаешь, пока не начнешь играть) Смотрим... \n Вариант 'скважина в центре' является не самой удобной хотя бы потому, что вместо одного монолитного стэка вам придется строить два отдельных друг от друга. Это сложно как и с точки зрения управления (надо постоянно менять направление перемещения тетромино), так и с точки зрения возможной вариативности укладки тетромино в стэк. Вариант центральной скважины требует больше линий для подготовки стэка к тетрису. Так что про-игроки используют его, только когда вынуждены. \n  Ну вот, и их осталось двое!) Левая скважина или правая? Смотрим... \n Высота игрового поля- 20 квадратов, а ширина 10 квадратов. Когда мы построили нашу скважину и дождались появления линии, то игра дает ее нам в горизонтальном положении и для ее применения нам надо ее повернуть. И вот какую картину мы видим: \n Игра вращает линию в правую сторону от центральной оси игрового поля. На ранних уровнях игры это не особо принципиально, а вот на тех скоростях, на которых бьются профессионалы, этот один сэкономленный сектор имеет огромное значение! Так что про-игроки строят свой стэк со скважиной именно справа.",
    postDate: new Date(),
    id: '3',
  },
];

export type PhorumThreadPageContentProps = {
  title: string;
};

export const PhorumThreadPageContent: FC<PhorumThreadPageContentProps> = ({ title }) => {
  const location = useLocation();
  const threadId = location.pathname;
  const [postList, setPostList] = useState(dummyPosts);
  const [, setNewPost] = useState('');
  const endRef = useRef<null | HTMLDivElement>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  useEffect(() => {
    if (isNewPost) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const getNewPost = useCallback(
    (text: string) => {
      setNewPost(text);
      const id = dummyPosts[dummyPosts.length - 1].id + 1;
      const cleanText = text.replace(/<[^>]+(>|$)/g, ' ');
      postList.push({
        userAvatar: 'https://www.fillmurray.com/200/300',
        userName: 'Я',
        text: cleanText,
        postDate: new Date(),
        id: id,
      });
      setPostList(postList);
      localStorage.removeItem(`${threadId}-saved-message`);
      setIsNewPost(true);
    },
    [postList, threadId],
  );

  // почему-то перестали работать переносы строк

  return (
    <div className="phorum-thread-page-content">
      <h3 className="phorum-thread-page-content__header">{title}</h3>
      <div className="phorum-thread-page-content__thread">
        <PhorumPostList {...postList} />
        <div ref={endRef} />
      </div>
      <PhorumReply getDataUp={getNewPost} />
    </div>
  );
};
