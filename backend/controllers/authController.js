export const login = async (req, res) => {
  const creds = req.body;
  console.log(creds);
  res.status(200);
};

export const signUp = async (req, res) => {
  const creds = req.body;
  console.log(creds);
  res.status(200);
};
