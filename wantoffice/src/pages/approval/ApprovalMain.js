import { useDispatch, useSelector } from 'react-redux';
import ApprovalMainCSS from "./ApprovalMain.module.css"
import RoomListCSS from "../../pages/room/RoomList.module.css";
import { useEffect, useState } from 'react';
import { callApprovalListAPI  } from '../../apis/ApprovalAPICalls';
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ApprovalModal from "../../components/approvals/ApprovalModal";

function ApprovalMain () {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const approvals = useSelector(state => state.approvalReducer);
    const approvalList = approvals.data;
    const [currentPage, setCurrentPage] = useState(1);
    

    useEffect(
        () => {
            dispatch(callApprovalListAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage]
    );

    const pageBtn = approvals.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }


/* 결재 등록 이동 */
 const ApprovalInsert = () =>{
    console.log('결재 등록 페이지');
    navigate(`/approval/approval-management`, { replace : false })
}


/* 결재등록 모달 */
const [modalOpen, setModalOpen] = useState(false);

const showModal = () => {
    setModalOpen(true);
    };
  


    return (
        <>
            <div>
            {/* 서브메뉴 */}
            <section className={ApprovalMainCSS.submenu}>
            <h3>DRAFTER</h3>

            {/* 결재등록버튼 */}
            <div>
            <button onClick={showModal}>New Document</button>
            {modalOpen && <ApprovalModal setModalOpen={setModalOpen} />}
             </div>
            
            <div className={ApprovalMainCSS.submenuDiv}>
            <h6>▶ 요청 결재 목록</h6>
            <ul className={ApprovalMainCSS.submenuUl} >
                <li>ㆍ전체 결재함</li>
                <li>ㆍ대기 결재함</li>
                <li>ㆍ완료 결재함</li>
                <li>ㆍ반려 결재함</li>
            </ul>
            </div>
            </section>
            </div>

            {/* 자주쓰는결재 , 전체 결재 목록 */}
            <section  className={ApprovalMainCSS.mainCantent}>
                <div className={ApprovalMainCSS.contentForm}>
                    <p>자주쓰는 결재 </p>
                </div>

                <div  className={ApprovalMainCSS.contentList}> 
                <p>전체 결재 목록</p>
                <table className={ApprovalMainCSS.approvalTable }>
                    <thead>
                        <th> No </th>
                        <th> 구분 </th>
                        <th> 제목 </th>
                        <th> 작성자 </th>
                        <th> 작성일자 </th>
                        <th> 결재자 </th>
                        <th> 처리일자 </th>
                        <th> 상태 </th>
                    </thead>
                        <tbody>  
                        { Array.isArray(approvalList) && approvalList.map(
                                    (a) => (
                                        <tr 
                                        >
                                            <th> {a.docNo} </th>
                                            <th> {a.form.dfTitle} </th>
                                            <th> {a.docTitle} </th>                                
                                            <th> {a.member.memberName} </th>
                                            <th> {a.docDate} </th>
                                            <th> {a.progress[a.progress.length - 1].member.memberName} </th>
                                            <th> {a.form.dfNo} </th>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
                
            </section>
            <div className={ RoomListCSS.roomPgs }>
                {
                    Array.isArray(approvalList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={ () => setCurrentPage(num) }>
                            <button
                                style={ currentPage === num ? { backgroundColor : 'red' } : null }
                                className= { RoomListCSS.pagingBtn }
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(approvalList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage + 1) }
                        disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                }
            </div>

           

            
     




        </>

        

        
    );

}

export default ApprovalMain;