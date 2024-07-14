// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const code = req.query.code;

//   if (!code) {
//     return res.status(400).send("No code provided");
//   }

//   try {
//     const response = await fetch(
//       `${process.env.API_URL}/auth/discord/callback`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ code }),
//       }
//     );

//     const data = await response.json();

//     if (response.ok) {
//       res.status(200).json(data);
//     } else {
//       res.status(response.status).json(data);
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
