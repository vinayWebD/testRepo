const Avatar = ({ image, name = '', size = 32, bgColor = 'white' }) => {
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
      className={`bg-${bgColor} rounded-full p-[10px] w-[${size}px] h-[${size}px] text-center flex items-center bg-contain bg-center`}
      style={{ backgroundImage: `url(${image})` || undefined }}
    >
      {!image ? getInitials(name) : ''}
    </div>
  );
};

export default Avatar;
