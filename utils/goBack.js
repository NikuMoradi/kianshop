export default function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/";
  }
}

// const goBack = () => {
//   router.go(-1);
// };
