import { AppBanner } from "../../appBanner";
import { ComicsList } from "../../comicsList";

export const ComicsPage = (props) => (
  <>
    <AppBanner />
    <ComicsList onComicSelected={props.onComicSelected} />
  </>
);

