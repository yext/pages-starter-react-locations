type Site = {
  name: string,
  logo: Logo,
  instagramHandle: string,
  twitterHandle: string,
};

type Logo = {
    image: Image,
}

type Image = {
    height: number,
    url: string,
}

export default Site;