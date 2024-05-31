interface Props {
  shortLink: string;
}

const LinkReady: React.FC<Props> = ({ shortLink }) => {
  const link = "http://localhost:5173/" + shortLink;
  return (
    <>
      <div>
        <p>Here is your link:</p>
        <a href={link}>{link}</a>
      </div>
    </>
  );
};

export default LinkReady;
