const Avatar = ({ image, name = '', classNames = 'w-[32px] h-[32px]' }) => {
  // Function to extract initials from the name.
  const getInitials = (name) => {
    if (!name) return '';

    const parts = name.split(' ');
    const firstInitial = parts[0][0] || '';
    const lastInitial = (parts[1] && parts[1][0]) || '';

    return firstInitial + lastInitial;
  };

  return (
    <div
      className={`bg-white aspect-square justify-center uppercase rounded-full p-[10px] text-center flex items-center bg-no-repeat bg-cover bg-center border border-greymedium ${classNames}`}
      style={{ backgroundImage: `url(${image})` || undefined }}
    >
      {!image ? getInitials(name) : ''}
    </div>
  );
};

export default Avatar;
