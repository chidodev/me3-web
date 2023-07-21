import QRReact from "qrcode.react";
import React from "react";
import PropTypes from "prop-types";

const bgColor = "#ffffff"; // theme.palette.background.default;
const fgColor = "#000000";

const QRCode = ({ value, size }: any) => (
  <QRReact value={value} bgColor={bgColor} fgColor={fgColor} renderAs="svg" includeMargin size={size} />
);

QRCode.propTypes = {
  size: PropTypes.number,
  value: PropTypes.string,
};

QRCode.defaultProps = {
  size: 150,
};

export default QRCode;
