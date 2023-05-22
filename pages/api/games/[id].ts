import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const gameId = req.query.id;

    res.status(200).json(fs.readFileSync(`./data/games/${gameId}.json`, "utf-8"));
}