import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  Box,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import DatePicker from "./styledComponents/Datepicker";
import { DONATION_DATE_OPTIONS } from "../config/constants";
import dashboardActions from "../actions/dashboardActions";
import {
  errorMessageSelector,
  fetchDashboardDataSelector,
  successMessageSelector,
} from "../selectors/dashboardSelectors";
import TimedAlert from "./styledComponents/TimedAlert";
import type { AlertProps, DasboardData, DateRangeType } from "../types/common";
import type { RootState } from "../apis/rootReducer";

type StyledCardProps = {
  width?: string;
  padding?: string;
  marginBottom?: string;
};

interface DashboardProps extends AlertProps {
  fetchData: (dateRange: DateRangeType, dataOwnerType: boolean) => void;
  dasboardData: DasboardData;
}

export const StyledCard = styled(Card)<StyledCardProps>(
  ({ width = "100%", padding = "10px 15px", marginBottom }) => ({
    padding,
    width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom,
    "& .donationList": {
      display: "flex",
      justifyContent: "space-between",
      justifySelf: "center",
      width: "60%",
      marginBottom: "3%",
    },
    "& .labelAndCount": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifySelf: "center",
    },
    "& .label": { fontSize: "1.7rem !important" },
    "& .borderedTypo": {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      width: 30,
      height: 30,
      zIndex: 0,
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background: `conic-gradient(
        red 0deg 100deg,
        transparent 100deg 120deg,
        blue 120deg 220deg,
        transparent 220deg 240deg,
        green 240deg 340deg,
        transparent 340deg 360deg
      )`,
        WebkitMask:
          "radial-gradient(farthest-side, transparent calc(100% - 3px), black 0)",
        zIndex: -1,
      },
    },
  })
);

const labelAndCountRender = (label: string, count: number) => (
  <Box className="labelAndCount">
    <Typography gutterBottom className="label">
      {label}
    </Typography>
    <Typography className="borderedTypo">{count}</Typography>
  </Box>
);

const Dashboard: FC<DashboardProps> = ({
  fetchData,
  dasboardData,
  successMessage,
  error,
  resetMessage,
}) => {
  const toggleButtons = [
    { label: "All Data", value: "all" },
    { label: "My Data", value: "mine" },
  ];
  const [dateRange, setDateRange] = useState({} as DateRangeType);
  const [activeToggle, setActiveToggle] = useState(
    get(toggleButtons, "[0].value", "")
  );
  const { pieData = [], graphData = [] } = dasboardData as DasboardData;

  useEffect(() => {
    !isEmpty(dateRange) && fetchData(dateRange, activeToggle === "mine");
  }, [dateRange, activeToggle]);

  return (
    <>
      <TimedAlert resetMessage={resetMessage} message={error} type="error" />
      <TimedAlert
        resetMessage={resetMessage}
        message={successMessage}
        type="success"
      />
      <Box
        margin="1% 3%"
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        gap="2vh"
      >
        <Box
          width="30%"
          alignItems="center"
          alignSelf="end"
          display="flex"
          justifyContent="space-between"
        >
          <ToggleButtonGroup
            value={activeToggle}
            onChange={(_e, value) => setActiveToggle(value)}
            exclusive
          >
            {toggleButtons.map(({ label, value }) => (
              <ToggleButton value={value}>{label}</ToggleButton>
            ))}
          </ToggleButtonGroup>
          <DatePicker
            options={DONATION_DATE_OPTIONS}
            onDateRangeChange={(tempDateRange) =>
              setDateRange(get(tempDateRange, "0", {}) as DateRangeType)
            }
            customWidth="45%"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box flexWrap="wrap" flexDirection="column" width="40%">
            <StyledCard marginBottom="5%">
              <Typography
                gutterBottom
                fontSize="3.5rem"
                variant="h5"
                component="div"
              >
                My Donations
              </Typography>
              <Box className="donationList">
                {labelAndCountRender("Toys", 5)}
                {labelAndCountRender("Food", 5)}
                {labelAndCountRender("Clothes", 5)}
              </Box>
            </StyledCard>
            <StyledCard>
              <Box height="330px" width="640px">
                <ResponsivePie
                  data={pieData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.6}
                  cornerRadius={2}
                  activeOuterRadiusOffset={8}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      translateY: 56,
                      itemWidth: 100,
                      itemHeight: 18,
                      symbolShape: "circle",
                    },
                  ]}
                  layers={[
                    "arcs",
                    "arcLabels",
                    "arcLinkLabels",
                    "legends",
                    (props) => (
                      <text
                        x={props.centerX}
                        y={props.centerY - props.radius - 20}
                        textAnchor="end"
                        style={{ fontSize: 18, fontWeight: "bold" }}
                      >
                        Donation Breakdown
                      </text>
                    ),
                  ]}
                />
              </Box>
            </StyledCard>
          </Box>

          <StyledCard width="52%" padding="20px 15px 10px 0">
            <Box height="530px" width="640px">
              <ResponsiveLine
                data={graphData}
                colors={({ color }) => color}
                curve="monotoneX"
                margin={{ top: 30, right: 80, bottom: 50, left: 70 }}
                axisBottom={{ legend: "Month", legendOffset: 36 }}
                axisLeft={{ legend: "Value", legendOffset: -55 }}
                pointSize={10}
                enableGridX={false}
                enableGridY={false}
                theme={{
                  axis: {
                    legend: {
                      text: { fontSize: 15, fill: "#000", margin: 10 },
                    },
                    domain: { line: { stroke: "#000", strokeWidth: 2 } },
                    ticks: {
                      text: { fontSize: 14, fill: "#333" },
                      line: { stroke: "#000" },
                    },
                  },
                }}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    itemWidth: 80,
                    itemHeight: 22,
                    symbolShape: "circle",
                    translateX: 100,
                  },
                ]}
                layers={[
                  "grid",
                  "axes",
                  "lines",
                  "points",
                  "slices",
                  "mesh",
                  "legends",
                  (props) => (
                    <text
                      x={props.innerWidth / 2}
                      y={-10}
                      textAnchor="middle"
                      style={{ fontSize: 18, fontWeight: "bold", fill: "#000" }}
                    >
                      Donation Trends
                    </text>
                  ),
                ]}
              />
            </Box>
          </StyledCard>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  dasboardData: fetchDashboardDataSelector(state),
  successMessage: successMessageSelector(state),
  error: errorMessageSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchData: (dateRange: DateRangeType, dataOwnerType: boolean) =>
    dispatch(dashboardActions.fetchDashboardData(dateRange, dataOwnerType)),
  resetMessage: () => dispatch(dashboardActions.resetMessage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
