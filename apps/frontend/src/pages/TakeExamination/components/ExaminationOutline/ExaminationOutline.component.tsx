import { useContext, useState } from 'react';
import { Accordion, Button, Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';

import { TakeTestContext } from '@/contexts/TakeTest.context';
import { LoadingContext } from '@/contexts/Loading.context';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


export default function ExaminationOutline() {
  const { t } = useTranslation();
  const { result, submit, data, reset, submited } = useContext(TakeTestContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { setLoading } = useContext(LoadingContext);

  const isComplete = Boolean(result?.every(item => item.answer.length > 0));

  const handleSubmit = () => {
    setLoading({ loading: true });
    submit().finally(() => {
      setLoading({ loading: false });
    });
    setShowConfirmModal(false);
  }

  const handleReset = () => {
    reset();
  }

  const canSubmit = (result.filter(item => item.answer.length > 0).length / result.length) > 0;

  return (
    <>
      <Accordion className="md:sticky md:top-16">
        <Accordion.Panel>
          <Accordion.Title><span className="md:flex md:justify-center gap-2 font-semibold text-ellipsis line-clamp-1">{data?.title || 'Untitled'}</span></Accordion.Title>
          <Accordion.Content>
            <div className="max-h-[calc(100vh_-_200px)] flex flex-col">
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 overflow-y-auto mb-3">
                {result.map(({ index, answer }) => 
                  <a key={index} className="mb-5" href={`#q-${index}`}>{index}. {answer.length > 0 ? answer.join(",") : '_'}</a>
                )}
              </div>
              {!submited && <Button fullSized onClick={() => setShowConfirmModal(true)} disabled={!canSubmit}>{t('Submit')}</Button>}
              {submited && <Button fullSized color="failure" onClick={handleReset}>{t('Reset')}</Button>}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>

      <Modal show={showConfirmModal} size="md" onClose={() => setShowConfirmModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {!isComplete && t("You have some questions, which isn't complete.")}<br />
              {t("Are you sure you want to submit this test?")}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleSubmit}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowConfirmModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}