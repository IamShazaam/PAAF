import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import type { Game } from '@/pages/api/games';
import { GameList } from '@/components/GameList';
import { Search } from '@/components/Search';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [fetchUrl, setFetchUrl] = useState<string>('/api/games');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // PAAC Standard
  // useEffect(() => {
  //   (async () => {
  //     const games = await fetch(fetchUrl).then((res) => res.json());
  //     setGames(games);
  //   })();
  // }, [games, fetchUrl]);

  // Jorge's fix 
  useEffect(() => {
    (async () => {
      const games = await fetch(fetchUrl).then((res) => res.json());
      setGames(games);
    })();
  }, [fetchUrl]);
  
  // PAAF Standard
  // useEffect(() => {
  //   if (searchTerm == null || searchTerm.trim() === '') {
  //     setFetchUrl('/api/games');
  //   } else {
  //     setFetchUrl(`/api/games?search=${searchTerm}`);
  //     console.log(`Searching via ${fetchUrl}`)
  //   }
  // }, [fetchUrl, searchTerm]);

  // Jorge's fix
  useEffect(() => {
    if (searchTerm == null || searchTerm.trim() === '') {
      setFetchUrl('/api/games');
    } else {
      setFetchUrl(`/api/games?search=${encodeURIComponent(searchTerm)}`);
    }
  }, [searchTerm]);
  
  // Jorge's fix
  const uniqueGames = games.reduce((unique, game) => {
    if (!unique.find((g) => g.title === game.title)) {
      unique.push(game);
    }
    return unique;
  }, []);
  
  const gameCount = searchTerm.length > 0 ? uniqueGames.length : games.length;


  return (
    <>
      <Head>
        <title>Paf Frontend Exercise</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Search onSearch={setSearchTerm} />

        {/* PAAF Standard         */}
        {/* {searchTerm.length && <span>Found {games.length} games</span>} */}

        {/* Jorge's fix */}
        {searchTerm.length && <span>Found {gameCount} games</span>}
        <GameList games={games} />
      </main>
    </>
  )
}
