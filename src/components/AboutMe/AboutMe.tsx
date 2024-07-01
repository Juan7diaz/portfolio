import cv from '@/data/cv.json';
import TextWithLineBreaks from '../common/TextWithLineBreaks';

function AboutMe() {
  return <TextWithLineBreaks text={cv.about.summary} />;
}

export default AboutMe;
