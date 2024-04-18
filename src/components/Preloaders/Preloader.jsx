import Style from "../../styles/components/preloaders/preloader/preloader.module.scss";

const Preloader = () => {
  return (
    <div className={Style.loader_pos}>
      <div className={Style.loader}></div>
    </div>
  );
};

export default Preloader;
