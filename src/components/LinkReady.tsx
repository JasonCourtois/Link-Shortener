interface Props {
  shortLink: string
}

const LinkReady: React.FC<Props> = ({ shortLink }) => {
  return (
    <>
      <div>
        <p>{shortLink}</p>
      </div>
    </>
  );
}

export default LinkReady;
