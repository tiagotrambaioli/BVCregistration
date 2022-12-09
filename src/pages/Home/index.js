import BannerFullWidth from './Banner/BannerFullWidth';
import SearchProgram from '../../components/SearchProgram';

export function Home() {
  return (
    <>
      <BannerFullWidth />
      <SearchProgram search="business" />
    </>
  );
}
