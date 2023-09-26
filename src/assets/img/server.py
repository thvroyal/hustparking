from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello World"

@app.route("/sendFile", methods=["POST"])
def send_file():
    # f_D3 = request.files["file"]
    # with open("D3_result.txt", "wb+") as f1:
    #     f1.write(f_D3.read())
    # f_D5 = request.files["file"]
    # with open("D5_result.txt", "wb+") as f2:
    #     f2.write(f_D5.read())
    f_C9 = request.files["file"]
    with open("C9_result.txt", "wb+") as f3:
        f3.write(f_C9.read())
    # f_TDN = request.files["file"]
    # with open("TDN_result.txt", "wb+") as f4:
    #     f4.write(f_TDN.read())
    return "Success"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5518, debug=False)