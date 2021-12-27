import React from 'react';
import { Icon, IIconProps } from 'native-base';
import Svg, { Path } from 'react-native-svg';

type StudentsIconProps = IIconProps;

const StudentsIcon = ({ ...props }: StudentsIconProps) => {
    return (
        <Icon {...props}>
            <Svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.3838 3.49492C12.9088 3.31537 12.3904 3.28471 11.8975 3.40704C11.6157 3.47699 11.3498 3.59509 11.111 3.75462C11.4719 4.38157 11.6666 5.09745 11.6666 5.83342C11.6666 6.56938 11.4719 7.28526 11.111 7.91221C11.3498 8.07174 11.6157 8.18984 11.8975 8.25979C12.3904 8.38212 12.9088 8.35146 13.3838 8.17192C13.8587 7.99237 14.2678 7.67243 14.5565 7.25469C14.8451 6.83695 14.9998 6.3412 14.9998 5.83342C14.9998 5.32563 14.8451 4.82988 14.5565 4.41214C14.2678 3.9944 13.8587 3.67447 13.3838 3.49492ZM9.99988 9.16683C10.4438 9.49971 10.952 9.74235 11.4961 9.87738C12.3174 10.0813 13.1814 10.0302 13.9731 9.73091C14.7647 9.43167 15.4465 8.89845 15.9276 8.20221C16.4087 7.50597 16.6664 6.67972 16.6664 5.83342C16.6664 4.98711 16.4087 4.16086 15.9276 3.46462C15.4465 2.76838 14.7647 2.23517 13.9731 1.93592C13.1814 1.63667 12.3174 1.58558 11.4961 1.78945C10.952 1.92448 10.4438 2.16712 9.99988 2.5C9.2829 1.96228 8.40666 1.66675 7.49996 1.66675C6.39489 1.66675 5.33508 2.10574 4.55368 2.88714C3.77228 3.66854 3.33329 4.72835 3.33329 5.83342C3.33329 6.93848 3.77228 7.99829 4.55368 8.77969C5.33508 9.5611 6.39489 10.0001 7.49996 10.0001C8.40667 10.0001 9.2829 9.70455 9.99988 9.16683ZM9.16663 3.97002V7.69681C8.70952 8.10569 8.11648 8.33342 7.49996 8.33342C6.83692 8.33342 6.20103 8.07002 5.73219 7.60118C5.26335 7.13234 4.99996 6.49646 4.99996 5.83342C4.99996 5.17037 5.26335 4.53449 5.73219 4.06565C6.20103 3.59681 6.83692 3.33342 7.49996 3.33342C8.11648 3.33342 8.70952 3.56114 9.16663 3.97002ZM9.99922 11.3959C10.779 11.0259 11.6331 10.8327 12.5002 10.8327C13.5242 10.8327 14.5302 11.1024 15.417 11.6144C16.3038 12.1265 17.0402 12.863 17.5521 13.7499C18.064 14.6368 18.3334 15.6428 18.3333 16.6667C18.3333 16.6668 18.3333 16.6667 18.3333 16.6667V17.5001C18.3333 17.9603 17.9602 18.3334 17.5 18.3334H2.49996C2.03972 18.3334 1.66663 17.9603 1.66663 17.5001V16.6667C1.66663 15.1197 2.28121 13.6359 3.37517 12.542C4.46913 11.448 5.95286 10.8334 7.49996 10.8334C8.37275 10.8334 9.22536 11.029 9.99922 11.3959ZM9.36755 12.9421C8.7932 12.6541 8.15452 12.5001 7.49996 12.5001C6.39489 12.5001 5.33508 12.9391 4.55368 13.7205C3.77228 14.5019 3.33329 15.5617 3.33329 16.6667H11.1707L9.36755 12.9421ZM11.666 12.5837C11.9394 12.5278 12.2188 12.4994 12.5001 12.4994C13.2316 12.4994 13.9501 12.692 14.5835 13.0577C15.217 13.4235 15.743 13.9496 16.1086 14.5831C16.4743 15.2166 16.6667 15.9352 16.6666 16.6666L13.3333 16.6667C13.3333 15.1392 12.7342 13.6735 11.666 12.5837Z"
                    fill="#FDFCFF"
                />
            </Svg>
        </Icon>
    );
};

export type { StudentsIconProps };
export { StudentsIcon };
