import { FC } from 'react';
import { GameItem } from '@/components/GameItem';
import styles from './GameList.module.css';

type Games = {
  id: number;
  title: string;
  image: string;
}[];

type Props = {
  games: Games;
};

export const GameList: FC<Props> = ({ games }) => {

  // Jorge's fix - Adding a filter to show unrepeated games.
  const uniqueGames = games.filter(
    (game, index) => games.findIndex((g) => g.title === game.title) === index
  );


  return (
    <section className={styles.gameList}>
      {uniqueGames.map(({ id, title, image }) => (
        <GameItem key={id} id={id} title={title} thumbnail={image} />
      ))}
    </section>
  );
};
