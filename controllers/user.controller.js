import User from '../models/user.model.js'; 

export const getUniqueViewerSVG = async (req, res) => {
  try {
    const { username, repository, label, color, style } = req.query;
    // console.log(username, repository);

    // ! need to create unique database for every user and collections for every repository...

    if (!username) {
      return res
        .status(400)
        .send({ message: "Username missing in parameter" });
    }

    const collectionName = username;
    if (repository) {
      collectionName = username + "_" + repository;
    }

    const data = (await User.findOne({ collectionName })) || {};
 
    const user = { 
      name: collectionName,  
      security: process.env.SECURITY,
    };

    const userCookie = JSON.parse(req?.cookies?.user || null);

    // console.log(user);
    // console.log(userCookie);
    if (
      !userCookie ||
      (userCookie.name != user.name && userCookie.name != user.security)
    ) {
      res.cookie("user", JSON.stringify(user), {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
        sameSite: "Strict",
      });
      // console.log(userCookie);

      // console.log(userCookie.name, process.env.NAME, userCookie.name, process.env.SECURITY);

      if (Object.keys(data).length) {
        data.count += 1;
        const setNewName = {
          $set: {
            ...data,
          },
        };
        const result = await User.updateOne(
          { collectionName },
          setNewName,
          {
            new: true,
          }
        );
      } else {
        data.collectionName = collectionName;
        data.count = 1;
        const result = await User.create(data);
      }
    }
    // const data = {};
    // data.count = 1;

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="114.2" height="20">
      <linearGradient id="b" x2="0" y2="100%">
          <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
          <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <mask id="a">
          <rect width="114.2" height="20" rx="3" fill="#fff"/>
      </mask>
      <g mask="url(#a)">
          <rect width="81.2" height="20" fill="#555"/>
          <rect x="81.2" width="33" height="20" fill="#0e75b6"/>
          <rect width="114.2" height="20" fill="url(#b)"/>
      </g>
      <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
          <text x="41.6" y="15" fill="#010101" fill-opacity=".3">Unique viewer</text>
          <text x="41.6" y="14">Unique viewer</text>
          <text x="96.7" y="15" fill="#010101" fill-opacity=".3">${data.count}</text>
          <text x="96.7" y="14">${data.count}</text>
      </g>
    </svg>`;

    // Set the proper Content-Type header
    res.setHeader("Content-Type", "image/svg+xml");

    // Send the SVG content directly
    res.send(svgContent);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errMssg: "Something error occured" });
  }
} 