import { useState } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"

const TabPanel = ({ children, value, index, ...other }) =>
  value === index && <Box>{children}</Box>

export default function CenteredTabs({ labels, children, className, color }) {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
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
          <Tab key={label} className="text-color font-light" label={label} />
        ))}
      </Tabs>
      {children.map((child, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <TabPanel key={index} value={value} index={index}>
          {child}
        </TabPanel>
      ))}
    </Box>
  )
}
