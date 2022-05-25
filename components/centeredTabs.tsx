import { useState } from "react";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TabPanel = ({ children, value, index, ...other }) => {
  return <>{value === index && <Box p={3}>{children}</Box>}</>;
};
export default function CenteredTabs({ labels, children, className, color }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className={className} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: color,
          },
        }}
        centered
      >
        {labels.map((label) => (
          <Tab className="text-color font-light" label={label}></Tab>
        ))}
      </Tabs>
      {children.map((child, index) => (
        <TabPanel value={value} index={index}>
          {child}
        </TabPanel>
      ))}
    </Box>
  );
}
