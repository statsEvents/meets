import {
  TelegramShareButton,
  WhatsappShareButton,
  VKShareButton,
  TwitterShareButton,
  VKIcon,
  TelegramIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";

const ShareLink = ({ shareRes, title }) => {
  return (
    <div>
      {/* VK Share Button */}
      <VKShareButton title={title} url={shareRes}>
        <VKIcon></VKIcon>
      </VKShareButton>

      {/* Telegram Share Button */}
      <TelegramShareButton title={title} url={shareRes}>
        <TelegramIcon></TelegramIcon>
      </TelegramShareButton>

      {/* Whatsapp Share Button */}
      <WhatsappShareButton title={title} url={shareRes}>
        <WhatsappIcon></WhatsappIcon>
      </WhatsappShareButton>

      {/* Twitter Share Button */}
      <TwitterShareButton title={title} url={shareRes}>
        <TwitterIcon></TwitterIcon>
      </TwitterShareButton>
    </div>
  );
};

export default ShareLink;
