export interface AvatarProps {
  src: string;
  onError?: () => void;
  className?: string;
}

export default function Avatar(props: AvatarProps) {
  return (
    <div>
      <img
        className={props.className}
        src={props.src}
        alt="avatar"
        onError={props.onError}
      />
    </div>
  );
}
