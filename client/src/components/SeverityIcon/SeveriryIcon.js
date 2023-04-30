import { Info, Error, WarningAmber } from "@mui/icons-material";
import { Severity } from "../../context/userStore";

export const SeverityIcon = ({ severity, fontSize = "large" }) => {
  let icon = null;

  switch (severity) {
    case Severity.info:
        icon = <Info fontSize={fontSize} />;
        break;
    case Severity.error:
        icon = <Error fontSize={fontSize} />;
        break;
    case Severity.success:
        icon = <Error fontSize={fontSize} />;
        break;
    case Severity.warning:
        icon = <WarningAmber fontSize={fontSize} />;
        break;
    default:
  }

  return icon;
};
