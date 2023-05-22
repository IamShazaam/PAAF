import type { NextApiRequest, NextApiResponse } from 'next';
import games from '@/data/games.json';

export type Game = (typeof games)[number];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof games | string>
) {
  const searchTerm = req.query.search;

  if (searchTerm == null) {
    res.status(200).json(games);
    return;
  }

  if (typeof searchTerm !== 'string') {
    sendErrorResponse(searchTerm, res);
    return;
  }
  //PAAF Standard
  // const filteredGames = games.filter((game) => game.title.match(new RegExp(searchTerm)));

  //Jorge's fix 1st - searching by letters
  // const filteredGames = games.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()));

  //Jorge's fix 2nd - Changing & to "and" when searching
  const filteredGames = games.filter((game) => containsSearchTerm(game.title, searchTerm));

  res.status(200).json(filteredGames);
}

function containsSearchTerm(title: string, searchTerm: string) {
  const normalizedTitle = normalizeString(title);
  const normalizedSearchTerm = normalizeString(searchTerm);
  return normalizedTitle.includes(normalizedSearchTerm);
}

function normalizeString(str: string) {
  return str.toLowerCase().replace(/&/g, 'and').trim();
}

function sendErrorResponse(invalidValue: unknown, res: NextApiResponse<string>) {
  res
    .status(400)
    .setHeader('Content-Type', 'text/html')
    .send(
      `<p>'<em>${invalidValue}</em>' not a valid search term.<br />
         Make sure you only send one 'search' parameter.</p>`
    );
}
