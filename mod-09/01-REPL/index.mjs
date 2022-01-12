import http from "http";

function netSalary({ discountPercentage, salary }) {
  const discount = discountPercentage / 100;
  const netValue = salary * (1 - discount);

  return netValue;
}

http
  .createServer((req, res) => {
    const url = req.url.replace("/", "");
    const params = new URLSearchParams(url);
    const data = Object.fromEntries(params);
    const result = netSalary(data);
    res.end(`Final salary: ${result}`);
  })
  .listen(3000, () => console.log("Server running at port 3000"));
