import { motion } from "framer-motion";

//generate the easings of x, y for motion element
function generateEasings(value: string | number, easings: number) {
  //unit of the value if it's a string
  //we split the value using the unit numbers
  //for example, we have 77vw, the unit is vw and the value 77
  //parseInt(value).toString() is going to return "77" and we
  //split "77vw" with "77" and it's gonna return ["", "vw"]
  //so we take the 2nd entry [1]
  const unit = typeof value === "string"? value.split(parseInt(value).toString())[1] : "";
  //we parse the value if it's a string to only get the number and we divide it
  //by the easings to only get the amount added at each easing occurency
  const perEasingAdding = (typeof value === "string"? parseInt(value) : value) / easings;

  //easings values, the computed values of easings
  const easingsValues: typeof value[] = [];
  
  for(let i = 0; i <= easings; i++) {
    easingsValues.push(unit !== ""? (perEasingAdding * i) + unit : perEasingAdding * i);
  }

  return easingsValues;
}

//move an element relative to provided x and y
export const Move = ({
  x,
  y,
  delay,
  children,
}: {
  x?: string | number;
  y?: string | number;
  delay?: number;
  children: any;
}) => (
  <motion.div
    animate={{ translateX: x || 0, translateY: y || 0}}
    transition={{
      delay: delay || 0,
      duration: 0.4,
    }}
  >
    {children}
  </motion.div>
);