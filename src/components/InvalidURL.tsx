interface Props {
  empty: number;
}

const InvalidURL: React.FC<Props> = ({ empty }) => {
  return (
    <>
      {empty === 1 && <p>No link</p>}
      {empty !== 1 && <p>Bad link</p>}
    </>
  );
};

export default InvalidURL;
