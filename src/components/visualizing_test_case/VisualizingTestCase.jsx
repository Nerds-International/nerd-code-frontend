import {observer} from "mobx-react-lite";
import PropTypes from "prop-types";
import BinaryTreeCanvas from "./types/BinaryTreeCanvas";
import {Flex} from "antd";
import {useEffect, useState} from "react";

const VisualizingTestCase = observer (({type, data}) => {

  return (<Flex vertical={false} gap={20} style={{
    borderTop: '1px solid black',
    marginRight: 20
  }}>
    <div>
      <p>Input: </p>
      <TypedCanvas type={type.input} data={data.input}/>
    </div>
    <div>
      <p>Output: </p>
      <TypedCanvas type={type.output} data={data.output}/>
    </div>
  </Flex>);
});

VisualizingTestCase.propTypes = {
  type: PropTypes.shape({
    input: PropTypes.number,
    // 0 - число или строка,
    // 1 - массив,
    // 2 - массив, представляющий бин. дерево
    output: PropTypes.number
    // 0 - число или строка,
    // 1 - массив,
    // 2 - массив, представляющий бин. дерево
  }).isRequired,
  data: PropTypes.shape({
    input: PropTypes.string,
    output: PropTypes.string
  }).isRequired
}

export default VisualizingTestCase;

const TypedCanvas = observer(({type, data}) => {
  const arrayedData = data.replaceAll(' ', '').split(',');
  const [stringifiedData, setStringifiedData] = useState('');

  useEffect(() => {
    let s = '['
    for (let i = 0; i < arrayedData.length; i++) {
      s += arrayedData[i].toString()
      if (i !== arrayedData.length - 1) s += ', '
    }
    s += ']'
    setStringifiedData(s);
  }, [arrayedData]);

  return (<>
    {type === 0 && <p>{data}</p>}
    {type === 1 && <p>{stringifiedData}</p>}
    {type === 2 && <BinaryTreeCanvas data={arrayedData}/>}
  </>);
});