import useSWRFetch from "../useSWRFetch";

const useAcademystats = () => {
  const academies = {
    文學院: ["戲劇學系", "外國語文學系 / 圖書資訊學系", "歷史學系"],
    電資學院: ["電機工程學系", "生醫電資所", "生物機電工程學系"],
    社會科學院: [
      "經濟學系",
      "科際整合法律學研究所",
      "經濟系",
      "外國語文學系/社會學系",
    ],
    管理學院: [
      "創新領域學士學位學程",
      "工商管理學系 科技管理組",
      "工商管理學系",
      "會計學系",
      "國際企業學系",
      "資訊管理學系",
    ],
    工學院: [
      "材料科學與工程學系",
      "工程科學及海洋工程學系",
      "醫學工程學系",
      "資訊工程學系",
      "資訊工程研究所",
    ],
    理學院: ["心理所一般組", "數學系", "物理學系", "心理學系", "物理治療學系"],
  };

  const { data } = useSWRFetch("https://api.projectszero.tech/getAcademyStats");
  const condenseData = {};
  const transformDate = (dataStr) => {
    Object.keys(academies).forEach((academy) => {
      let total = 0;
      academies[academy].forEach((department) => {
        data ? (total += dataStr[department]) : 0;
      });
      condenseData[academy] = total;
    });
    return condenseData;
  };

  return {
    labels: data ? Object.keys(transformDate(data)) : [],
    values: data ? Object.values(transformDate(data)) : [],
  };
};

export default useAcademystats;
