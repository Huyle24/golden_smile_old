import { Container } from "react-bootstrap";

export default function HighLight(data){
    console.log(data.data);
    function createMarkup(c) {
        return {__html: c};
    }
    return (
        <Container  className="mt-4">
            <p className="title_page_detail">Điểm nhấn</p>
            {[data.data].map((item,index) =>(
                <div className="highlight" key={index}>
                    {item.content && <div dangerouslySetInnerHTML={createMarkup(item.content)}></div>}

                </div>
            ))}

        </Container>
    )
}