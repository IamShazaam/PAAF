import { FC, useState } from 'react';
import styles from './GameItem.module.css'

type Props = {
  id: number;
  title: string;
  thumbnail: string;
}

type Info = {
  rtp: {
    theoretical: string;
  }
}

export const GameItem: FC<Props> = ({id, title, thumbnail}) => {
  const [info, setInfo] = useState<Info>()

  // PAAF Standard
  // const onOver = () => {
  //   fetch(`/api/games/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setInfo(JSON.parse(data)));
  // }


  // Jorge's fix => Handle the selection when the ID is not valid
  const onOver = () => {
    if (id >= 1 && id <= 3) {
      fetch(`/api/games/${id}`)
        .then((res) => res.json())
        .then((data) => setInfo(JSON.parse(data)));
    } else {

      //Showing the error instead of touching data folder
      console.log('Invalid game ID');
      
    }
  }


  const onOut = () => {
    setInfo(undefined)
  }

  return (
    <figure className={styles.gameItem} onMouseEnter={onOver} onMouseLeave={onOut}>
      <img src={thumbnail} alt="" />
      <figcaption>{title}</figcaption>
      {info && (
        <div className={styles.gameInfo}>
          <div>Theoretical RTP: {info.rtp.theoretical}</div>
        </div>
      )}
    </figure>
  );
};
